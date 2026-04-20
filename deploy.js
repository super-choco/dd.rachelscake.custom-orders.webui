import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import SftpClient from 'ssh2-sftp-client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env.deploy
const envFile = fs.readFileSync(path.join(__dirname, '.env.deploy'), 'utf-8')
const env = Object.fromEntries(
  envFile.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map(s => s.trim()))
)

const config = {
  host: env.SFTP_HOST,
  port: parseInt(env.SFTP_PORT),
  username: env.SFTP_USER,
  password: env.SFTP_PASS,
  tryKeyboard: true,
  readyTimeout: 20000,
  retries: 2,
}
const remotePath = env.SFTP_REMOTE_PATH

const sftp = new SftpClient()

async function uploadDir(localDir, remoteDir) {
  await sftp.mkdir(remoteDir, true)
  const entries = fs.readdirSync(localDir, { withFileTypes: true })
  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name)
    const remoteDest = `${remoteDir}/${entry.name}`
    if (entry.isDirectory()) {
      await uploadDir(localPath, remoteDest)
    } else {
      process.stdout.write(`  → ${remoteDest}\n`)
      await sftp.put(localPath, remoteDest)
    }
  }
}

async function deploy() {
  console.log(`\nConectando a ${config.host}...`)
  await sftp.connect(config)
  console.log('Conectado.\n')

  console.log('Subiendo dist/ ...')
  await uploadDir(path.join(__dirname, 'dist'), remotePath)

  console.log('\nSubiendo api/ ...')
  await uploadDir(path.join(__dirname, 'api'), `${remotePath}/api`)

  await sftp.end()
  console.log(`\n✓ Deploy completado en ${remotePath}`)
}

deploy().catch(err => {
  console.error('\n✗ Error durante el deploy:', err.message)
  sftp.end()
  process.exit(1)
})

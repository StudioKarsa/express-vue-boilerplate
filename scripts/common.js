const { spawn } = require('child_process')

function getFullCommandPath(cmd) {
  let cmds = []

  spawn('where', [cmd], {
    shell: true,
    stdio: 'pipe',
  }).stdout.on('data', (data) => {
    cmds.push(data.toString().trim())
  })
}

function runWorkspacePackage(workspaceName, script) {
  const yarnCmd = getFullCommandPath('yarn')
  spawn(...yarnCmd, ['workspace', workspaceName, script], {
    shell: true,
    stdio: 'inherit',
  })
}

module.exports = { getFullCommandPath, runWorkspacePackage }

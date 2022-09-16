import test from "tape"
import { helpers } from '@remix-project/remix-lib'
import { readFileSync } from 'fs'
import { join } from 'path'
import { default as StatRunner } from '../../src/solidity-analyzer'
import solc from 'solc';
import { CompilationResult, AnalysisReportObj, AnalysisReport } from '../../src/types'
import { checksEffectsInteraction } from '../../src/solidity-analyzer/modules/'
const {compilerInput  } = helpers.compiler
const folder: string = 'solidity-v0.5'

let compiler
test('setup', function (t) {
  solc.loadRemoteVersion('v0.5.0+commit.1d4f565a', (error, solcVersion) => {
    if (error) throw error
    compiler = solcVersion
    t.end()
  })
});

function compile (fileName): CompilationResult {
  const content: string = readFileSync(join(__dirname, 'test-contracts/' + folder, fileName), 'utf8')
  return JSON.parse(compiler.compile(compilerInput(content)))
}

test('staticAnalysisIssues.functionParameterPassingError', function (t) {
  // https://github.com/ethereum/remix-ide/issues/889#issuecomment-351746474
  t.plan(2)
  const res: CompilationResult = compile('functionParameters.sol')
  const Module: any = checksEffectsInteraction
  const statRunner: StatRunner = new StatRunner()

  t.doesNotThrow(() => {
    statRunner.runWithModuleList(res, [{ name: new Module().name, mod: new Module() }], (reports: AnalysisReport[]) => {})
  }, 'Analysis should not throw')

  statRunner.runWithModuleList(res, [{ name: new Module().name, mod: new Module() }], (reports: AnalysisReport[]) => {
    t.ok(!reports.some((mod: AnalysisReport) => mod.report.some((rep: AnalysisReportObj) => rep.warning.includes('INTERNAL ERROR')), 'Should not have internal errors'))
  })
})

import { Glob } from 'bun';
import { createCommandFile } from './command-file.js';
import { createTargetFile } from './target-file.js';

const targetFiles = await Promise.all([
	createTargetFile(
		'src/client.ts',
		{
			async: false,
			getReturnType: (return_type: string) => `Promise<${return_type}>`,
			getBody: (invocation: string) => `return this.useCommand(${invocation});`,
		},
	),
]);

const glob = new Glob('src/commands/*/*.ts');
const glob_exclude = new Glob('**/*.test.ts');
for await (const path of glob.scan('.')) {
	if (glob_exclude.match(path) !== true) {
		const commandFile = await createCommandFile(path);
		targetFiles[0].addCommand(commandFile);
	}
}

// console.log(targetFiles[0]);
// targetFiles[0].print();
await targetFiles[0].write();

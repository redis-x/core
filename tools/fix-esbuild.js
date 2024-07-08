/* global Bun */

let content = await Bun.file('dist/main.cjs').text();

content = content.replaceAll(
	/\nvar (\w+) = class {\n/g,
	'\nclass $1 {\n',
);

await Bun.write(
	'dist/main.cjs',
	content,
);

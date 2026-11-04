const { execSync } = require('child_process');

const presets = [
  'office_coding',
  'esports_gaming',
  'intel_arc_edition',
  'aaa_gaming',
  'content_creation',
  'enthusiast_flagship',
  'unknown_fallback'
];

for (const p of presets) {
  const start = Date.now();
  const cmd = `D:\\Stuff\\swipl\\bin\\swipl.exe -s pakar_pc.pl -g "batch_rekomendasi(${p}), halt." --quiet`;
  const out = execSync(cmd).toString();
  const time = Date.now() - start;
  const firstLine = out.split('\n')[0].trim();
  console.log(`[${time}ms] ${p}: ${firstLine}`);
}

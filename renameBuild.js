const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const distDir = path.join(__dirname, 'dist');

// Se a pasta "dist" já existir, apagar
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

// Criar nova pasta "dist"
fs.mkdirSync(distDir);

// Copiar arquivos da pasta "build" para "dist"
function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(buildDir)) {
  copyRecursive(buildDir, distDir);
  console.log('✅ Conteúdo da pasta "build" copiado para "dist" com sucesso!');
} else {
  console.log('❌ Pasta "build" não encontrada. Execute "npm run build" primeiro.');
}

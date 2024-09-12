const fs = require('fs');
const path = require('path');

// Obtiene el directorio raíz del proyecto
const ROOT_DIR = process.cwd();

// Directorios para las plantillas y destino
const TEMPLATE_DIR = path.join(ROOT_DIR, 'module-scaffolding/template');
const DEST_DIR = path.join(ROOT_DIR, 'src/modules');

// Función para convertir nombres de módulos a PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Función para generar el módulo
function generateModule(moduleName) {
  const moduleNamePascal = toPascalCase(moduleName); // Convertir nombre del módulo a PascalCase

  // Función auxiliar para copiar archivos de la plantilla al destino
  function copyFile(src, dest) {
    fs.readFile(src, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${src}: ${err}`);
        return;
      }

      // Reemplaza <ModuleName> y <ModuleFile> en el contenido del archivo
      let modifiedData = data
        .replace(/<ModuleName>/g, moduleNamePascal)
        .replace(/<ModuleFile>/g, moduleName);

      fs.writeFile(dest, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${dest}: ${err}`);
        } else {
          console.log(`File generated: ${dest}`);
        }
      });
    });
  }

  // Función para copiar archivos de la plantilla al destino, respetando la estructura de carpetas
  function copyTemplateFolder(srcFolder, destFolder) {
    console.log(`Scanning directory: ${srcFolder}`); // Debug: Imprime la ruta del directorio
    fs.readdir(srcFolder, (err, files) => {
      if (err) {
        console.error(`Error reading directory ${srcFolder}: ${err}`);
        return;
      }

      files.forEach(file => {
        const srcPath = path.join(srcFolder, file);
        let destFileName = file;

        // Cambia la extensión de .txt a .ts
        if (file.endsWith('.txt')) {
          destFileName = file.replace(/\.txt$/, '.ts');
        }

        // Lógica para reemplazar <ModuleName> en los nombres de archivos
        destFileName = destFileName.replace(/template/g, moduleName);

        const destPath = path.join(destFolder, destFileName);

        fs.stat(srcPath, (err, stats) => {
          if (err) {
            console.error(`Error stating file ${srcPath}: ${err}`);
            return;
          }

          if (stats.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyTemplateFolder(srcPath, destPath);
          } else {
            copyFile(srcPath, destPath);
          }
        });
      });
    });
  }

  // Crear el directorio del módulo y copiar los archivos
  const moduleDestDir = path.join(DEST_DIR, moduleName);
  fs.mkdirSync(moduleDestDir, { recursive: true });
  copyTemplateFolder(TEMPLATE_DIR, moduleDestDir);
}

// Obtener el nombre del módulo desde los argumentos de la línea de comandos
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Please provide a module name');
  process.exit(1);
}

generateModule(moduleName);

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    root: path.resolve(__dirname, 'src'),
    build: {
      outDir: '../dist',
      emptyOutDir: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          includePaths: ['node_modules']
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});



// | Backend | Frontend | O que colocar no `vite.config.js`    |
// | ------- | -------- | ------------------------------------ |
// | Docker  | Docker   | `'http://backend:4000'`              |
// | Local   | Docker   | `'http://host.docker.internal:4000'` |
// | Local   | Local    | `'http://localhost:4000'`            |


// | Serviço usado     | `vite.config.js` mudou | Preciso rebuild?  | Ação recomendada                                 |
// | ----------------- | ---------------------- | ----------------  | -------------------------------------------------|
// | `frontend-dev`    | Sim                    | ❌ Não           | Reinicia se não atualizar automaticamente        |
// | `frontend`(prod)  | Sim                    | ✅ Sim           | `docker compose build frontend && up -d frontend`|


// Backup code for reference:

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   root: path.resolve(__dirname, 'src'),
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         quietDeps: true,
//         includePaths: ['node_modules']
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src')
//     }
//   },
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     // Descomenta e ajusta o proxy se precisares de comunicar com o backend via /api
//     proxy: {
//       '/api': {
//           target: env.VITE_API_URL,
//           changeOrigin: true,
//           secure: false}
//     // '/api': 'http://backend:4000' // Frontend e backend no docker
//     // '/api': 'http://host.docker.internal:4000' // Frontend no docker e backend npm(local)
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/stocks': {
        target: 'https://gonzastocks.tech',
        changeOrigin: true,
        secure: false, // porque estás usando HTTPS, pero puede tener certificado no perfecto
        rewrite: (path) => path.replace(/^\/stocks/, '/stocks'), 
      },
    },
  },
})

import dotnev from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

dotnev.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
})

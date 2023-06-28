import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const timestamp = new Date().getTime()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    return {
        // 开发或生产环境服务的公共基础路径
        base: '/',
        plugins: [vue()],
        resolve: {
            // 定义路径别名
            alias: {
                '@': path.resolve(__dirname, './src') // 路径别名
            },
            // 导入时想要省略的扩展名列表
            extensions: ['.js', '.ts', '.json']
        },
        // 打包文件的输出目录
        build: {
            outDir: `${mode === 'pro' ? 'build' : 'dist'}`,
            rollupOptions: {
                output: {
                    manualChunks: (filePath) => {
                        if (filePath.includes('node_modules')) {
                            return 'vendor'
                        }
                    },
                    entryFileNames: `assets/[name].${timestamp}.js`,
                    // 块文件名
                    chunkFileNames: `assets/[name]-[hash].${timestamp}.js`,
                    // 资源文件名 css 图片等等
                    assetFileNames: `assets/[name]-[hash].${timestamp}.[ext]`
                }
            },
            // 生产环境去除 `console` `debugger` 值为布尔值
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            server: {
                port: 8080
            }
        }
    }
})

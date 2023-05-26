import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    theme: {
        colors: {
            primary: '#22e1b9',
            textColor: '#333',
        },
        boxShadow: {
            pretty: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.01) 0px 3px 6px',
        },
    },
    presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
})

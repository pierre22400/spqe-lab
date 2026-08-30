import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://pierre22400.github.io',
  base: process.env.GITHUB_ACTIONS ? '/spqe-lab' : '/',
  integrations: [
    starlight({
      title: 'SpQE Lab',
      description: 'Evidence-driven software generation through executable qualification, diagnosis and targeted repair.',
      customCss: ['./src/styles/archcode.css', './src/styles/custom.css'],
      sidebar: [
        { slug: 'index' },
        {
          label: 'Comparative Benchmarks',
          items: [
            { slug: 'benchmarks' },
            { slug: 'benchmarks/transaction-reconciliation' },
            { slug: 'benchmarks/data-workspace-natural' },
            { slug: 'benchmarks/noisedoselab' }
          ]
        },
        {
          label: 'Methods',
          items: [
            { label: 'Methods overview', slug: 'methods' },
            { slug: 'methods/family-driven-generation' }
          ]
        },
        {
          label: 'Experiments',
          items: [
            { slug: 'experiments/noisedoselab' },
            { slug: 'experiments/data-workspace' },
            { slug: 'experiments/blender-spatial-relationships' },
            { slug: 'experiments/um-harness' }
          ]
        },
        { slug: 'foundations' },
        {
          label: 'About',
          items: [
            { slug: 'about' },
            { slug: 'about/why-this-showcase' }
          ]
        }
      ]
    })
  ]
});

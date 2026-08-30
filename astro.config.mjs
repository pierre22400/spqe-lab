import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://pierre22400.github.io',
  base: process.env.GITHUB_ACTIONS ? '/spqe-lab' : '/',
  integrations: [
    starlight({
      title: 'Specification-to-Prototype Qualification Engine Lab',
      description: 'SpQE Lab explores how structured prototype requests can be generated, tested, repaired, documented, and qualified as inspectable software prototypes.',
      customCss: ['./src/styles/archcode.css', './src/styles/custom.css'],
      sidebar: [
        { slug: 'index' },
        { slug: 'foundations' },
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
          label: 'Experiments',
          items: [
            { slug: 'experiments/noisedoselab' },
            { slug: 'experiments/data-workspace' },
            { slug: 'experiments/blender-spatial-relationships' },
            { slug: 'experiments/um-harness' }
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
          label: 'Request Kit',
          items: [
            { slug: 'request-kit' },
            { slug: 'request-kit/contact-dossier-form' },
            { slug: 'request-kit/prototype-request-form' },
            { slug: 'request-kit/specblock-best-practices' },
            { slug: 'request-kit/complete-specblock-example' }
          ]
        },
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

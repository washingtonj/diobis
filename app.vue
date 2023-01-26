<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: 'Diobis | As melhores vagas do GitHub.',
  link: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;600;700&family=Poppins:wght@200;400;500;700&display=swap',
      rel: 'stylesheet',
    },
    { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' },
  ],
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Sua plataforma de vagas direto do GitHub',
    },
    {
      name: 'og:description',
      content: 'Sua plataforma de vagas direto do GitHub',
    },
    {
      name: 'twitter:title',
      content: 'Diobis - Sua plataforma de vagas direto do GitHub',
    },
    { name: 'twitter:site', content: '@diobis' },
    { name: 'twitter:creator', content: '@diobis' },
  ],
})
</script>

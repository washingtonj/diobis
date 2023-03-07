<script lang="ts" setup>
const repos = [
  {
    name: 'FrontEnd Brasil',
    url: 'https://github.com/frontendbr/vagas',
    logo: 'https://avatars.githubusercontent.com/u/16963863?s=200&v=4'
  },
  {
    name: 'Backend Brasil',
    url: 'https://github.com/backend-br/vagas',
    logo: 'https://avatars3.githubusercontent.com/u/30732658?v=4&s=200.jpg'
  }
]

</script>

<template>
  <main class="py-8 px-8">
    <h1 class="font-bold text-2xl">
      O que é o Diobis?
    </h1>
    <p class="pt-4 text-md">
      Diobis é uma plataforma de vagas criada para simplificar a busca por emprego utilizando os repositórios do GitHub
      como fonte de dados. Nós utilizamos uma UX personalizada e amigável que remove a complexidade e as informações
      desnecessárias (para vaga) que uma issue pode trazer, permitindo que você encontre as melhores oportunidades de
      emprego diretamente no GitHub, sem a necessidade de navegar por diversas páginas.
    </p>

    <section>
      <h2 class="font-bold text-lg pt-8">
        De quais repositorios são extraídas as vagas?
      </h2>
      <p class="pt-2 text-md">
        Atualmente, as vagas são extraídas de repositórios públicos do GitHub todos da comunidade, que tal conhecer um
        pouco mais sobre cada um deles?
      </p>

      <ul class="w-full flex flex-wrap pt-4 not-last:mr-4">
        <li v-for="repo in repos" :key="repo.name" class="pt-2">
          <a :href="repo.url" target="_blank" class="flex items-center">
            <img :src="repo.logo" :alt="repo.name" class="h-20">
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
  import { marked } from 'marked'

  let markdown = 'Nossa empresa\r\n\r\nDê uma olhada no nosso Site: http://www.fdte.org.br/\r\na Fundação é com foco em engenharia - ligada a Poli-USP\r\no nosso escritório tem o foco em engenharia de software, com modelo de fabrica de software\r\n\r\n**Desenvolver código de qualidade usando React.JS\r\nNecessário ter idioma Inglês fluente (TODO O PROCESSO SERÁ NO IDIOMA INGLÊS)**\r\n\r\nContratação\r\nPJ +\r\n\r\nVantagens\r\n● 80hs em banco de horas, como descanso, após 1 ano de contrato\r\n● Possibilidade de bônus ate 2x o valor de prestação de serviços (pois, depende de metas)\r\n● Possibilidade de Bolsa MBA (parceria com a FIAP) - sorteio entre a equipe interessado no curso.\r\n● Programa de terapia\r\n● Incentivo financeiro mensal (em cartão de crédito corporativo) para desenvolvimento pessoal\r\ncompra de livros, cursos, certificações e participação de eventos da área de tecnologia.\r\n\r\nComo se candidatar\r\nPor favor, envie um e mail para [vanessa.bruno@fdte.io](mailto:vanessa.bruno@fdte.io) - com seu CV anexado - enviar no assunto: Vaga Frontend com inglês\r\n\r\nCostumamos enviar feedbacks em até 7 dias após cada processo.'
</script>

<article class="text-sm w-full">
  {@html marked.parse(markdown)}
</article>


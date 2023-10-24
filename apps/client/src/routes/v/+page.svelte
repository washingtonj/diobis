<script>
  import { Markdown, JobCard } from 'ui/components';
</script>

<main class="flex gap-4">
  <div class="w-4/12 flex">
    <JobCard
      comments={24}
      likes={3}
      postedAt="12-10-2023"
      shortDescription="Dê uma olhada no nosso Site: http://www.fdte.org.br/ a Fundação é com foco em engenharia - ligada a Poli-USP o nosso escritório tem o foco em engenharia de software, com modelo de fabrica de software"
      tags={['FrontEndBR', 'washingtonj']}
      title="Software Engineer na Diobis.app"
    />
  </div>

  <div class="w-8/12 bg-neutral p-8 h-full rounded-lg">
    <div class="mb-12">
      <div>
        <h1 class="text-xl font-bold">Software Engineer na Diobis.app</h1>
        <h3 class="text-[.7rem] uppercase">
          GH<b class="text-primary px-1">:</b>FrontEndBR<b class="text-primary px-1">:</b
          >washingtonj
        </h3>
      </div>

      <div class="flex gap-4 mt-2">
        <span>
          <span class="text-xs text-base-content">Posted</span>
          <span class="text-xs font-bold">12-10-2023</span>
        </span>

        <span>
          <span class="text-xs text-base-content">Comments</span>
          <span class="text-xs font-bold">24</span>
        </span>

        <span>
          <span class="text-xs text-base-content">Likes</span>
          <span class="text-xs font-bold">3</span>
        </span>
      </div>
    </div>

    <div class="border-t h-0.5 w-full pb-12" />

    <Markdown />
  </div>
</main>

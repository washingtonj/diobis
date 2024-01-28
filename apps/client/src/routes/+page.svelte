<script lang="ts">
  import { JobCard, MasonryContainer, MasonryColumn } from 'ui/components';
  import { createMasonry } from 'ui/functions';
  import { screenSize } from 'ui/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  console.log(data);

  $: columnsByScreenType = {
    ultrawide: 5,
    wide: 4,
    mid: 2,
    small: 1
  }[$screenSize];
</script>

{#await data.payload()}
  <div class="mt-32 flex items-center justify-center">
    <span class="loading loading-spinner text-primary" />
  </div>
{:then response}
  <MasonryContainer>
    {#each createMasonry(response, columnsByScreenType).chuck() as column}
      <MasonryColumn>
        {#each column as job}
          <JobCard
            title={job.title}
            shortDescription={''}
            tags={job.tags}
            postedAt={job.createdAt}
            comments={job.quantityOfComments}
            likes={job.quantityOfComments}
            source={job.source}
            avatar={job.userAvatar}
            sourceUrl={job.sourceUrl}
          />
        {/each}
      </MasonryColumn>
    {/each}
  </MasonryContainer>
{/await}

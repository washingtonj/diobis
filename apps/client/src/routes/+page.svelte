<script lang="ts">
  import { JobCard, MasonryContainer, MasonryColumn } from 'ui/components';
  import { createMasonry } from 'ui/functions';
  import { screenSize } from 'ui/stores';
  import { searchKeys } from '$lib/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  const screenSizeColumns = {
    ultrawide: 4,
    wide: 3,
    mid: 2,
    small: 1
  };

  function filterJobsBySearchKeys(data: PageData['jobs'], searchKeys: string[]) {
    if (!searchKeys.length) return data;

    return searchKeys
      .map((key) => {
        return data.filter((job) => {
          const title = job.title.toLowerCase();
          const tags = job.tags.join(' ').toLowerCase();
          const source = job.source.toLowerCase();

          const searchKey = key.toLowerCase();

          return (
            tags.includes(searchKey) || title.includes(searchKey) || source.includes(searchKey)
          );
        });
      })
      .flat();
  }

  $: filtredData = filterJobsBySearchKeys(data.jobs, $searchKeys);
  $: columnsByScreenType = screenSizeColumns[$screenSize];
</script>

<svelte:head>
  <title>Diobis - Uncover tech jobs.</title>
  <meta name="description" content="Uncover tech job openings scattered across the web" />
  <meta property="og:title" content="Diobis - Uncover tech jobs" />
  <meta property="og:description" content="Uncover tech job openings scattered across the web" />
  <meta property="og:image" content="https://diobis.com/og-image.png" />
  <meta property="og:url" content="https://diobis.app" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Diobis" />
  <meta name="twitter:site" content="@diobis.app" />
  <meta name="twitter:creator" content="@washingtonj" />
  <meta name="twitter:title" content="Diobis - Uncover tech jobs" />
  <meta name="twitter:description" content="Uncover tech job openings scattered across the web" />
  <meta name="twitter:image:alt" content="Diobis - Uncover tech jobs" />
</svelte:head>

{#await Promise.resolve(data.jobs)}
  <div class="mt-32 flex items-center justify-center">
    <span class="loading loading-spinner text-primary" />
  </div>
{:then _}
  <MasonryContainer>
    {#each createMasonry(filtredData, columnsByScreenType).chuck() as column}
      <MasonryColumn>
        {#each column as job}
          <JobCard
            title={job.title}
            shortDescription={''}
            tags={job.tags}
            postedAt={job.createdAt}
            comments={job.quantityOfComments}
            interactions={job.quantityOfInteractions}
            source={job.source}
            avatar={job.userAvatar}
            sourceUrl={job.sourceUrl}
          />
        {/each}
      </MasonryColumn>
    {/each}
  </MasonryContainer>
{/await}

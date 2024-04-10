<script lang="ts">
  import { Button } from 'flowbite-svelte';

  type ChallengeRoutes = Array<{
    title: string;
    description: string;
    href: string;
  }>;

  const routes: ChallengeRoutes = [
    {
      title: 'Day 1: Naughty or Nice',
      description:
        'Elves modern system track whether children are Naughty or Nice based on thier deeds.',
      href: '/day1'
    },
    {
      title: 'Day 2: Merry Munch-o-Meter',
      description: 'Cookie counter to track cookies munched by the Santa',
      href: '/day2'
    }
  ];
</script>

<svelte:head>
  <title>Advent Of Svelte 2023</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="mt-12 flex flex-col gap-4">
  {#each routes as { title, description, href }}
    <div class="space-y-2 text-center">
      <h3 class="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
      <a
        class="inline-block rounded border-2 border-solid px-4 py-2 hover:bg-white/10 focus-visible:bg-white/10"
        {title}
        {href}>View Solution</a
      >
    </div>
  {/each}
</main>

<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronLeftOutline, ChevronRightOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
  import {
    Button,
    Input,
    Label,
    Modal,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    Pagination
  } from 'flowbite-svelte';
  import { type ElfTally, getPaginatedItemsFromChildrens, getNiceChild, getNaughtyChild } from '$lib/day1';

  type ChildModal = 
    { open: boolean; title: string } 
    & ({ action: 'add' } | { action: 'edit'; index: number });

  let searchTerm = '';
  let currentIndex = 1;
  let childrens: ElfTally[] = [];
  let child = { name: '', tally: 0 };
  let childModal: ChildModal = {
    open: false,
    title: '',
    action: 'add'
  };
  const pageSize = 10;

  $: paginatedChildrens = getPaginatedItemsFromChildrens({
    data: childrens,
    offset: currentIndex,
    pageSize,
    searchTerm
  });
  $: niceChild = getNiceChild(childrens);
  $: naughtyChild = getNaughtyChild(childrens);

  async function getElfTally() {
    try {
      const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
      if (!res.ok) throw new Error(`HTTP Error status: ${res.status}`);
      childrens = await res.json();
    } catch (error) {
      console.error('Fetch Error: ', error);
    }
  }

  function addChild() {
    childrens = [...childrens, child];
  }

  function editChild(index: number) {
    childrens[index - 1] = child;
  }

  function deleteChild(index: number) {
    childrens.splice(index - 1, 1);
    childrens = childrens;
  }

  onMount(() => getElfTally());
</script>

<svelte:head>
  <title>Advent of Svelte 2023 | Day 1 - Naughty or Nice</title>
</svelte:head>

<div class="flex flex-col gap-8">
  <h1 class="text-xl font-semibold">Elf Tally</h1>

  <p>
    Elves are tracking children's with good and bad deads from a list of {childrens.length} children. Let's see who is Nicest
    child and Who is Naughtiest one.
  </p>

  <p>
    The Nicest Child is <strong>{niceChild?.name}</strong> with score of {niceChild?.tally}. The Nughtiest Child is
    <strong>{naughtyChild?.name}</strong>
    with score of {naughtyChild?.tally}.
  </p>
  <Button color="light" on:click={() => (childModal = { ...childModal, open: true, title: 'Add a New Child' })}
    >Add a New Child</Button
  >

  <Modal
    title={childModal.title}
    open={childModal.open}
    on:close={() => (childModal = { ...childModal, open: false, title: '' })}
    autoclose
    outsideclose
  >
    <Label for="name">Name</Label>
    <Input type="text" id="name" bind:value={child.name} required />
    <Label for="tally">Name</Label>
    <Input type="number" id="tally" bind:value={child.tally} required />
    <svelte:fragment slot="footer">
      {#if childModal.action === 'add'}
        <Button color="light" on:click={addChild}>Add Child</Button>
      {:else}
        <Button color="light" on:click={() => editChild(childModal.index)}>Edit Child</Button>
      {/if}
      <Button color="alternative">Cancel</Button>
    </svelte:fragment>
  </Modal>
  <div class="space-y-2">
    <Label class="text-white">
      Search by Kid Name: <Input class="ml-4 inline-block w-fit" type="text" bind:value={searchTerm} />
    </Label>
    <Table>
      <TableHead class="bg-gray-200">
        <TableHeadCell>S.R. NO.</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Tally</TableHeadCell>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each paginatedChildrens as children}
          <TableBodyRow>
            <TableBodyCell>{children.index}</TableBodyCell>
            <TableBodyCell scope="row">{children.name}</TableBodyCell>
            <TableBodyCell>{children.tally}</TableBodyCell>
            <TableBodyCell>{children.tally >= 0 ? 'Nice' : 'Naughty'}</TableBodyCell>
            <TableBodyCell>
              <Button
                color="blue"
                outline
                on:click={() => {
                  child = { name: children.name, tally: children.tally };
                  childModal = { open: true, title: 'Edit Child Details', action: 'edit', index: children.index };
                }}><EditOutline /></Button
              >
              <Button color="red" outline on:click={() => deleteChild(children.index)}><TrashBinOutline /></Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
    <div class="flex items-center justify-between">
      {#if paginatedChildrens.length}
        <p>
          Showing
          <strong>
            {paginatedChildrens.length === 1
              ? paginatedChildrens[0].index
              : paginatedChildrens[0].index + '-' + paginatedChildrens[paginatedChildrens.length - 1].index}
          </strong>
          of <strong>{childrens.length}</strong>
        </p>
      {:else}
        <p>No Items to Show</p>
      {/if}
      <Pagination
        on:previous={() => (currentIndex = Math.max(currentIndex - 1, 1))}
        on:next={() => (currentIndex = Math.min(currentIndex + 1, Math.ceil(childrens.length / pageSize)))}
        icon
      >
        <svelte:fragment slot="prev">
          <span class="sr-only">Previous</span>
          <ChevronLeftOutline class="h-6 w-6" />
        </svelte:fragment>
        <svelte:fragment slot="next">
          <span class="sr-only">Next</span>
          <ChevronRightOutline class="h-6 w-6" />
        </svelte:fragment>
      </Pagination>
    </div>
  </div>
</div>

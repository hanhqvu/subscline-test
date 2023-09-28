<script lang="ts">
  import Counter from './Counter.svelte';

  let counters: Array<{ id: string; title: string; count: number }> = [
    { id: '1', title: '', count: 0 }
  ];

  $: sum = counters.map(el => el.count).reduce((sum, value) => sum + value, 0);

  $: titles = counters
    .map(el => (el.title.length !== 0 ? el.title : '""'))
    .toString();

  function addCounter() {
    counters = [
      ...counters,
      { id: String(counters.length + 1), title: '', count: 0 }
    ];
  }

  function removeCounterWithId(id: string) {
    counters = counters.filter(el => el.id !== id);
  }
</script>

<div>
  {#each counters as counter (counter.id)}
    <Counter
      bind:count={counter.count}
      bind:title={counter.title}
    >
      <button on:click={() => removeCounterWithId(counter.id)}>Remove</button>
    </Counter>
  {/each}
  <button on:click={addCounter}>Add Counter</button>
  <p>The sum is {sum}</p>
  <p>The titles are: {titles}</p>
</div>

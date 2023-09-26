<script lang="ts">
  import Counter from './Counter.svelte';

  let counters: Array<{ id: string; count: number }> = [{ id: '1', count: 0 }];

  $: sum = counters.map(el => el.count).reduce((sum, value) => sum + value, 0);

  function addCounter() {
    counters = [...counters, { id: String(counters.length + 1), count: 0 }];
  }

  function removeCounterWithId(id: string) {
    counters = counters.filter(el => el.id !== id);
  }
</script>

<div>
  {#each counters as counter (counter.id)}
    <Counter bind:count={counter.count}>
      <button on:click={() => removeCounterWithId(counter.id)}>Remove</button>
    </Counter>
  {/each}
  <button on:click={addCounter}>Add Counter</button>
  <span>The sum is {sum}</span>
</div>

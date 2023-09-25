<script lang="ts">
  let editing = false;
  let title = '';
  let count = 0;

  function toggleEdit() {
    editing =!editing;
  }

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function reset() {
    count = 0;
  }
</script>

{#if editing}
  <input 
    bind:value={title}
    type='text'
    placeholder='Title'
    on:blur={toggleEdit}
  />
{:else}
  <span>{title ? title : "Click edit to add title"}</span>
{/if}
<button on:click={toggleEdit}>
  {#if editing}
    Cancel
  {:else}
    Edit
  {/if}
</button>
<span>count is {count}</span>
<button on:click={increment}>
  Increment
</button>
<button on:click={decrement}>
  Decrement
</button>
<button on:click={reset}>
  Reset
</button>

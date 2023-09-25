<script lang="ts">
  let count = 0;

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

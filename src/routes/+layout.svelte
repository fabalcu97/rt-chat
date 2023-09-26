<script>
  import { isLoading } from '$lib/loader';
  import { onMount } from 'svelte';
  import '../app.css';
  import Loader from '../components/loader.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { currentUser } from '$lib/pocketbase/auth';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (!$currentUser) {
      goto('/login');
    }
  });
</script>

<div class="relative">
  <slot />

  {#if $isLoading}
    <Loader />
  {/if}
  <SvelteToast />
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>

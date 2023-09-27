<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import {
    clearSession,
    currentUser,
    userCollection,
  } from '$lib/pocketbase/auth';
  import {
    createMessage,
    getMessages,
    messagesCollection,
  } from '$lib/pocketbase/messages';
  import Container from './container.svelte';
  import type { Message } from '$lib/pocketbase/types';
  import ChatBubble from './chatBubble.svelte';

  let messages: Message[] = [];
  let unsubscribe: () => void;
  let newMessage = '';

  function sendMessage() {
    if (!newMessage) {
      return;
    }
    createMessage(newMessage);
    newMessage = '';
  }

  function logout() {
    clearSession();
    goto('/');
  }

  onMount(async () => {
    messages = await getMessages();
    unsubscribe = await messagesCollection.subscribe<Message>(
      '*',
      async ({ action, record }) => {
        switch (action) {
          case 'create':
            const user = await userCollection.getOne(record.sentBy);
            messages = [
              { ...record, user: { username: user.username, id: user.id } },
              ...messages,
            ];
            return;
          default:
            return;
        }
      },
    );
  });

  onDestroy(() => unsubscribe && unsubscribe());
</script>

<Container>
  <div class="flex flex-row justify-between">
    <div />
    <h2>Welcome {$currentUser?.username}!</h2>
    <button
      class="flex-0 bg-red-200 rounded-md hover:bg-red-300 px-2"
      on:click={logout}>Logout</button
    >
  </div>
  <div
    class="basis-11/12 overflow-y-auto flex flex-col-reverse flex-nowrap overflow-auto no-scrollbar"
  >
    {#each messages as message (message.id)}
      {#if message.user.id === $currentUser?.id}
        <ChatBubble {message} own />
      {:else}
        <ChatBubble {message} />
      {/if}
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage} class="basis-0 flex mt-5">
    <input
      bind:value={newMessage}
      class="flex-1 border-2 rounded-full mr-3 pl-5"
      placeholder="Enter your message"
    />
    <button class="flex-2 bg-emerald-200 rounded-full px-5" type="submit"
      >Send</button
    >
  </form>
</Container>

<style lang="postcss">
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>

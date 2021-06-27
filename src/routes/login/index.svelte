<script context="module">
    export async function load({ session }) {
        if (session.user) {
            return { redirect: "/", status: 302 };
        }
        return {};
    }
</script>

<script>
    import { t } from "svelte-intl-precompile";
</script>

<svelte:head>
    <title>Relay • Sign in</title>
</svelte:head>

<main class="background--container">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-main sm:rounded-lg sm:px-10">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2
                    class="my-6 text-center text-3xl font-extrabold text-gray-900"
                >
                {$t('login.welcome')} 
                </h2>
            </div>
            <div class="mt-6">
                <a href="/auth/twitch" class="auth--button shadow-main">
                    <span class="sr-only">{$t('login.twitch')}</span>
                    <div class="auth-lock-social-button-icon">
                        <img
                            width="25"
                            src="https://static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png"
                            alt="Twitch Logo"
                        />
                    </div>
                    {$t('login.twitch')}
                </a>
            </div>

            <div class="mt-6">
                <a href="/auth/google" class="auth--button shadow-main">
                    <span class="sr-only">{$t('login.google')}</span>
                    <div class="auth-lock-social-button-icon">
                        <img
                            width="25"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                            alt="Google Logo"
                        />
                    </div>
                    {$t('login.google')}
                </a>
            </div>
        </div>
    </div>
</main>

<style>
    .background--container {
        min-height: calc(100vh - 65px);
        @apply flex;
        @apply flex-col;
        @apply justify-center;
        @apply bg-gray-50;
        @apply p-3;
        background-image: url("CLOUDINARY_IMAGE_URL/login-container-background.svg");
        background-position: center;
        background-size: cover;
    }

    .auth--button {
        @apply w-full;
        @apply relative;
        @apply flex;
        @apply justify-center;
        @apply border;
        @apply border-transparent;
        @apply p-3;
        @apply sm:rounded-lg;
        @apply focus:outline-none;
    }

    .auth--button:focus,
    .auth--button:hover,
    .auth--button:focus-within {
        @apply outline-none;
        @apply ring-2;
        @apply ring-indigo-500;
    }

    .auth-lock-social-button-icon {
        position: absolute;
        left: 20px;
        top: calc(50% - 10px);
    }

    .auth-lock-social-button-icon > img {
        width: 20px;
        height: 20px;
    }
</style>

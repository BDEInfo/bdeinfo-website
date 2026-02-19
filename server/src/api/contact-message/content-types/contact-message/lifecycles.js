export default {
    async afterCreate(event) {
        const { result } = event;

        // Safety check
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            strapi.log.warn('DISCORD_WEBHOOK_URL not set');
            return;
        }

        // Build Discord payload
        const payload = {
            username: 'bdeinfo.org',
            embeds: [
                {
                    title: '📩 New Contact Request',
                    color: 0x5865f2,
                    fields: [
                        {
                            name: 'Name',
                            value: result.name || '—',
                            inline: true,
                        },
                        {
                            name: 'Email',
                            value: result.mail || '—',
                            inline: true,
                        },
                        {
                            name: 'Subject',
                            value: result.subject || '—',
                        },
                        {
                            name: 'Message',
                            value: result.message?.slice(0, 1000) || '—',
                        },
                    ],
                    timestamp: new Date().toISOString(),
                },
            ],
        };

        // Send to Discord
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            // Never crash Strapi
            strapi.log.error('Discord webhook failed', error);
        }
    },
};

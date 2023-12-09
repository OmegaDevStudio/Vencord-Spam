
import { findByPropsLazy } from "@webpack";
import definePlugin, { OptionType } from "@utils/types";
import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption, sendBotMessage} from "@api/Commands";
import { MessageStore, UserStore } from "@webpack/common";
import { Message, Channel } from "discord-types/general";
import { MessageActions } from "@utils/discord";
const MessageDelete = findByPropsLazy("deleteMessage", "patchMessageAttachments");



function SpamMessages(amount: number, channel: Channel, content: string) {
    let message = {
        // The following are required to prevent Discord from throwing an error
        invalidEmojis: [],
        tts: false,
        validNonShortcutEmojis: [],
        content: content
    };
    var counter = 0;
    console.log("In Spam Message");
    for (let i = 0; i < amount; i++) {
        console.log("In Spam Message send 1");
        MessageActions.sendMessage(channel.id, message, void 0);
        console.log("In Spam Message send 2");
        counter++;
    }
    return counter
}




export default definePlugin({
    name: "MessageSpam",
    description: "Spams messages to a channel",
    dependencies: ["CommandsAPI"],
    authors: [{name: "Shell", id: 1056383259325513888n}],
    options: {
        baddies: {
            name: "I will be a baddie",
            description: "If enabled I will become baddie",
            type: OptionType.BOOLEAN,
            default: true
        }
    },
    commands: [
        {
            name: "spam",
            description: "Manage spam related commands",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [
                {
                    name: "spam",
                    description: "Begins spamming messages by a set amount",
                    type: ApplicationCommandOptionType.SUB_COMMAND,
                    options: [
                        {
                            name: "amount",
                            description: "How many messages you wish to spam",
                            type: ApplicationCommandOptionType.INTEGER,
                            required: true
                        },
                        {
                            name: "content",
                            description: "Message you would like to spam",
                            type: ApplicationCommandOptionType.STRING,
                            required: true
                        },
                        {
                            name: "channel",
                            description: "Channel ID you wish to spam to",
                            type: ApplicationCommandOptionType.CHANNEL,
                            required: false
                        }
                    ]
                }
            ],

            async execute(args, ctx) {
                switch (args[0].name) {
                    case "spam": {
                        const amount: number = findOption(args[0].options, "amount", 0);
                        const channel: Channel = findOption(args[0].options, "channel", ctx.channel);
                        const msg: string = findOption(args[0].options, "content", "ur mom");
                        const len = SpamMessages(amount, channel, msg);
                        return sendBotMessage(ctx.channel.id, {
                            content: `Successfully spammed ${len} Messages for ${channel.name}`
                        })
                    }

                    default: {
                        return sendBotMessage(ctx.channel.id, {
                            content: "Invalid sub-command"
                        });
                        
                    }
                }
            }
        }
    ],
})

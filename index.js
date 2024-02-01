/*import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
*/
import openai from './config/open-ai.js';
import readlineSync from 'readline-sync'
import colors from 'colors'


async function main() {
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ "role": "user", "content": "HEllo what is your name!" }],
    // });
    // console.log(chatCompletion.choices[0].message);

    const chatHistory = [];


    console.log(colors.bold.green('Welcome to CHATGPT program'));
    console.log(colors.bold.green('You can start chatting with the bot.'));

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You:'));

        try {

            const messages = chatHistory.map(([role, content]) => ({ role, content }))

            messages.push({ role: 'user', content: userInput })


            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            const completionText = chatCompletion.choices[0].message.content;
            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.green('Bot: ') + completionText);
                return;

            }

            console.log(colors.green('Bot: ') + completionText);

            //Update the userHistory array with user and assistant messages

            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        }
        catch (error) {
            console.error(colors.red(error));
        }




    }

}
//console.log(chatCompletion.choices[0].message.content);
main();


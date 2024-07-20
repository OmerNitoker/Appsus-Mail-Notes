// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    getUser,
    getEmptyMail,
    save,
    remove,
    getUnreadCount,
    star,
    setIsRead
}

function star(mailId) {
    return get(mailId)
        .then(mail => {
            mail.isStarred = !mail.isStarred
            save(mail)
            // console.log(mail)
            return mail
        })

}

function setIsRead(mailId){
    return get(mailId)
    .then(mail => {
        mail.isRead= !mail.isRead
        save(mail)
        return mail
    })
}
function getUnreadCount() {
    return mailService.query('inbox')
        .then(mails => {
            const userMail = getUser().email
            const unReadMails = mails.filter(mail => mail.to === userMail && !mail.isRead)
            return unReadMails.length
        })
}

function remove(mailId) {
    return get(mailId)
        .then(mail => {
            if (!mail.removedAt) {
                mail.removedAt = Date.now()
                save(mail)
            } else storageService.remove(MAIL_KEY, mailId)
        })
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: true,
        sentAt: null,
        removedAt: null,
        from: getUser().email,
        to: '',
        isStarred: false
    }
}
function getUser() {
    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    return loggedinUser
}

function save(mail) {
    // console.log(mail)
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function query(mailsToShow) {
    console.log(mailsToShow)
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // console.log(mails)
            const userMail = getUser().email
            if (mailsToShow.folder === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            } else if (mailsToShow.folder === 'starred') {
                mails = mails.filter(mail => mail.isStarred)
            } else if (mailsToShow.folder === 'inbox') {
                mails = mails.filter(mail => mail.to === userMail && !mail.removedAt)
            } else if (mailsToShow.folder === 'sent') {
                mails = mails.filter(mail => mail.from === userMail && !mail.removedAt && mail.sentAt)
            } else if (mailsToShow.folder === 'drafts') {
                mails = mails.filter(mail => !mail.sentAt && !mail.removedAt)
            }
            if (mailsToShow.txt) {
                const regExp = new RegExp(mailsToShow.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail[mailsToShow.searchBy]))
            }
            if (mailsToShow.isUnread) {
                mails = mails.filter(mail => !mail.isRead)
            }
            // if (mailsToShow.from){
            //     const regExp = new RegExp(mailsToShow.from, 'i')
            //     mails = mails.filter(mail => regExp.test(mail.from))
            // }

            // if (mailsToShow.date) {
            //     console.log(Date.parse(date))
            //     mails = mails.filter(mail => Date.parse(date) === mail.sentAt)
            // }

            if (mailsToShow.sortBy === 'date' || !mailsToShow.sortBy) {
                mails = mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt)
            } else if (mailsToShow.sortBy === 'subject') {
                mails = mails.sort((mail1, mail2) => mail1.subject.localeCompare(mail2.subject))
            }
            // console.log(mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail.isRead = true
            save(mail)
            mail = _setNextPrevMailId(mail)
            return mail
        })
}
function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}
function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: true,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e102',
            subject: 'Delivery Update',
            body: 'Order 3025323788890605 has a delivery update. You can view the shipping status below',
            isRead: false,
            sentAt: 1666715480000,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e103',
            subject: 'Thank you for buying our product',
            body: 'Receipt number 31904, View your order',
            isRead: false,
            sentAt: 1662457980000,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e104',
            subject: '34142636 is your Facebook account recovery code',
            body: `We received a request to reset your Facebook password.
    Enter the following password reset code: 34172636
    Alternatively, you can directly change your password.
    Didn't request this change?
If you didn't request a new password, let us know.`,
            isRead: false,
            sentAt: 1631123068000,
            removedAt: null,
            from: 'security@facebookmail.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e105',
            subject: 'Order 3025323788890605: order confirmation',
            body: `
            Order confirmation\n
Hi Muki
Thank you for shopping with us. Your order 3025323788890605 is confirmed. We'll let you know when your order ships.`,
            isRead: false,
            sentAt: 1630940268000,
            removedAt: null,
            from: 'notice@aliexpress.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e106',
            subject: 'See why travelers are loving Mauritius, Africa',
            body: `Find the best of the best in Mauritius, Africa
            Travelers agree: Mauritius, Africa has the best of everything—from first-rate restaurants to five-bubble stays. And thanks to all the rave reviews, it's also one of this year's Travelers' Choice Best of the Best Trending Destinations.`,
            isRead: false,
            sentAt: 1667899180000,
            removedAt: null,
            from: 'notice@tripadvisor.com',
            to: 'user@appsus.com',
            isStarred: true
        },
        {
            id: 'e107',
            subject: 'Code for signing in to Zoom',
            body: `
           
Hi Muki,
We detected an unusual sign-in from a device or location you don't usually use. If this was you, enter the code below to sign in to Zoom.
311389
The code will expire in 10 minutes.
Please review the sign in activity details below
If this wasn't you, please let us know here. We recommend that you update your password and enable two-factor authentication to secure your account.
Thank you,
The Zoom Team`,
            isRead: false,
            sentAt: 1666993580000,
            removedAt: null,
            from: 'no-reply@zoom.us',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e108',
            subject: `✨Quiz✨ What's your travel personality?`,
            body: `Your travel personality, revealed
            What type of traveler are you? Take our quiz to find out and get a few Travelers' Choice Best of the Best winners to match.\n Take the quiz`,
            isRead: false,
            sentAt: 1662965580000,
            removedAt: null,
            from: 'notice@tripadvisor.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e109',
            subject: `Order 3024459134010605: delivery update`,
            body: `
            Order update
            Hi Muki,
            Order 3024459134010605 has a delivery update. You can view the shipping status below.
            View update
            Order details
            Placed on Jul 15,2023, 12:47`,
            isRead: false,
            sentAt: 1663284780000,
            removedAt: null,
            from: 'transaction@notice.aliexpress.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e110',
            subject: `Udacity Password Reset`,
            body: `
            Hi Muki,
            
            Looks like you'd like to change your Udacity password. Please click the following button to do so.
            
            Please disregard this e-mail if you did not request a password reset.
            SET PASSWORD
            Or copy this link and paste in your web browser
            
            https://auth.udacity.com/reset-password?token=jRQQdcOcksnw1XOhQEze
            
            Cheers,
            The Udacity Team
            `,
            isRead: false,
            sentAt: 1666366380000,
            removedAt: null,
            from: 'support@udacity.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e111',
            subject: `Hi Muki, welcome to Dropbox!
            `,
            body: `Verify your email
            Hi,
            Enter this code in the next 10 minutes to sign up:
            066062
            If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.
            `,
            isRead: false,
            sentAt: 1664483180000,
            removedAt: null,
            from: 'no-reply@em-s.dropbox.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e112',
            subject: `066062 is your Zoom verification code`,
            body: `
            Welcome!
            Let's get you started
            We're excited to get you up and running! Whether you're looking to back up your devices or share pics and videos with friends and colleagues, let us show you how easy it can be. Dropbox is made for this stuff.
            `,
            isRead: false,
            sentAt: 1667523180000,
            removedAt: null,
            from: 'no-reply@zoom.us',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e113',
            subject: `Nossos Termos de Uso estão mudando
            `,
            body: `
            Nossos Termos de Uso estão mudando
            Olá!
            A BlaBlaCar está em constante evolução para lhe proporcionar sempre mais satisfação e atender às suas necessidades. Por esse motivo, ajustamos regularmente os nossos Termos de Uso e a nossa Política de Privacidade, para garantir que eles permaneçam transparentes para você.
            
            Atualizamos os nossos Termos de Uso e a nossa Política de Privacidade para refletir as mudanças em sua experiência na plataforma, introduzindo o novo sistema de reservas para viagens de carona e atualizando as regras para verificação de identidade.
            
            Se quiser obter mais informações, convidamos você a ler nossos Termos de Uso atualizados na íntegra clicando aqui e a nossa Política de Privacidade, clicando aqui.
            
            Essas alterações entrarão em vigor (i) a partir de 10 de julho de 2023 ou (ii) antes dessa data se você usar a plataforma para reservar um lugar ou publicar uma viagem de carona, quando aplicável.
            
            Caso se oponha às alterações, você deve encerrar sua conta antes dessa data. Se continuar a usar a nossa plataforma após essa data, significa que você leu e aceitou os Termos de Uso atualizados.
            
            Boas viagens!
            Equipe BlaBlaCar            
            `,
            isRead: false,
            sentAt: 1665198380000,
            removedAt: null,
            from: 'no-reply@blablacar.us',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e114',
            subject: `Che Lagarto Hostel`,
            body: `
            Olá, 
            Você ganhou desconto na sua próximo estadía. Para fazer sua reserva, é só enviar mensagem pelo WhatsApp!    
            `,
            isRead: false,
            sentAt: 1664860780000,
            removedAt: null,
            from: 'buzios@chelagarto.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e115',
            subject: `Notification of shipment numbered UZ0514456836Y`,
            body: `
            Dear client,
Thank you for collecting the shipment UZ0514456836Y by Israel Post.
We suggest you register in the personal area in my post to manage and track the shipments.
Thank you, Israel Post.
            `,
            isRead: false,
            sentAt: 1664860780000,
            removedAt: 1694279107286,
            from: 'ReplyP123@postil.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e116',
            subject: `2023's top bucket list experiences`,
            body: `
            The best bucket list experiences
Dream trip, anyone? From zipping across the desert in an ATV to paragliding more than 6,000 feet in the air, these special experiences came up on top of most travelers' lists. This year's Travelers' Choice Best of the Best Bucket List Experiences are finally in.
            `,
            isRead: false,
            sentAt: 1664860780000,
            removedAt: 1694279107286,
            from: 'ReplyP123@postil.com',
            to: 'user@appsus.com',
            isStarred: false
        },
        {
            id: 'e117',
            subject: `Your order has been accepted on the Super-Pharm website`,
            body: `Summary of your order
            For , Muki
            Below is a summary of the order you placed on the website
            On 14.07.23 at 13:13
            
            `,
            isRead: false,
            sentAt: 1664860780000,
            removedAt: null,
            from: 'shop@super-pharm.co.il',
            to: 'user@appsus.com',
            isStarred: true
        },
        {
            id: 'e118',
            subject: `Life updates`,
            body: `Hi Mom,
            how are you?
            how is Dad?
            I'm doing great!
            `,
            isRead: false,
            sentAt: 1664860780000,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'mom@mail.com',
            isStarred: false
        },
        {
            id: 'e119',
            subject: `Regarding Our Upcoming Meeting`,
            body: `Dear John Doe,

            I hope this email finds you well. I wanted to reach out and discuss a business opportunity that I believe aligns perfectly with your expertise and interests.
            
            I'm writing to confirm our meeting scheduled for:
            
            Date: Thursday, September 15th, 2023
            Time: 2:00 PM
            Location: ABC Conference Room
            
            During our meeting, we will go over the details of the project and explore how we can collaborate effectively. If you have any questions or need additional information before the meeting, please don't hesitate to reach out.
            
            Looking forward to our discussion and the potential for a fruitful partnership.
            
            Best regards
            `,
            isRead: false,
            sentAt: 1664860780000,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'John@mail.com',
            isStarred: false
        }




        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
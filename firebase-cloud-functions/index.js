const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const emailSender = getEmailSenderConfig(functions.config().app);

exports.sendEmailResponseToCandidate = functions.https.onRequest((req, res) => {
  let candidate = req.body['candidate'];
  let candidateStacks = getCandidateStacks(candidate.abilities);

  if (candidateStacks.isFrontEnd) {
    let frontEnd = candidateStacks.names.frontEnd;
    sendCandidateEmail(candidate, frontEnd);
  }

  if (candidateStacks.isBackEnd) {
    let backEnd = candidateStacks.names.backEnd;
    sendCandidateEmail(candidate, backEnd);
  }

  if (candidateStacks.isMobile) {
    let mobile = candidateStacks.names.mobile;
    sendCandidateEmail(candidate, mobile);
  }

  if (candidateStacks.isGeneric) {
    sendCandidateEmail(candidate);
  }

  return res.status(200).send(true);
});

function getCandidateStacks(abilities) {
  return {
    isFrontEnd: isFrontEnd(abilities),
    isBackEnd: isBackEnd(abilities),
    isMobile: isMobile(abilities),
    isGeneric: (!isFrontEnd && !isBackEnd && !isMobile),
    names: {
      frontEnd: 'Front-End ',
      backEnd: 'Back-End ',
      mobile: 'Mobile '
    }
  };

  function isFrontEnd(abilities) {
    let knowHtml = (abilities.html >= 7);
    let knowCss = (abilities.css >= 7);
    let knowJavascript = (abilities.javascript >= 7);
  
    return (knowHtml && knowCss && knowJavascript);
  }
  
  function isBackEnd(abilities) {
    let knowPhyton = (abilities.phyton >= 7);
    let knowDjango = (abilities.django >= 7);
  
    return (knowDjango && knowPhyton);
  }
  
  function isMobile(abilities) {
    let knowIos = (abilities.ios >= 7);
    let knowAndroid = (abilities.android >= 7);
  
    return (knowAndroid || knowIos);
  }
}

function sendCandidateEmail(candidate, stack) {
  let emailBody = getEmailBody(candidate, stack);

  return sendEmail(emailBody);

  function getEmailBody(candidate, stack) {
    let emailSubject = 'Obrigado por se candidatar';
    let emailContent = getEmailContent(stack);

    return {
      from: emailSender.sender,
      to: candidate.email,
      subject: emailSubject,
      html: emailContent
    };
  }

  function getEmailContent(stack) {
    return `Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador ${stack}entraremos em contato.`;
  }
}

function sendEmail(emailBody) {
  const transporter = nodemailer.createTransport(`smtps://${emailSender.address}:${emailSender.password}@smtp.gmail.com`);

  return transporter.sendMail(emailBody, (error, info) => {
    if (error) {
      console.log(res.status(error.responseCode).send(error));
    }

    console.log(`Mensagem ${info.messageId} enviada: ${info.response}`);
  });
}

function getEmailSenderConfig(appConfig) {
  return {
    address: encodeURIComponent(appConfig.email.address),
    password: encodeURIComponent(appConfig.email.password),
    sender: `"${appConfig.name}" <${appConfig.email.address}>`
  };
}

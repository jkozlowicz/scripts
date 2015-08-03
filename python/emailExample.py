__author__ = 'jkozlowicz1'

from email.mime.multipart import MIMEMultipart
import smtplib
import logging
import datetime
import socket

from email.utils import formatdate
from email.mime.text import MIMEText

from jinja2 import Template

from twisted.mail.smtp import sendmail

HOSTNAME = socket.gethostname()

SMTP_SERVER_HOST = 'mailserver.mydomain.com'

TESTING_EMAIL_SENDER = 'jkozlowicz@mydomain.com'
TESTING_EMAIL_RECIPIENTS = ['jkozlowicz@mydomain.com', ]

PRODUCTION_EMAIL_SENDER = 'jkozlowicz@mydomain.com'
PRODUCTION_EMAIL_RECIPIENTS = ['jkozlowicz@mydomain.com', ]

EMAIL_SETTINGS = {
    'testing': {
        'sender_email': TESTING_EMAIL_SENDER,
        'recipients': TESTING_EMAIL_RECIPIENTS
    },
    'production': {
        'sender_email': PRODUCTION_EMAIL_SENDER,
        'recipients': PRODUCTION_EMAIL_RECIPIENTS
    },
}

HEADERS = [
    'URL',
    'startTime',
    'closed_at',
    'requestStarted',
    'restartStarted',
    'status',
]

def gen_pre_information(_args, stage):
    started_at = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    content = Template("""
    <!DOCTYPE html>
    <html>
        <head>
            <title>Restarting script pre-information</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div class="container">
                <h1>Restarting script pre-information</h1>
                <p>Start at: {{started_at}}</p>
                <p>Started from host: {{host}}</p>
                <table style="border-spacing: 0.5rem; border-collapse: collapse;">
                    <caption>Script arguments</caption>
                    <thead >
                        <tr>
                            <th style="border: 1px solid #999; padding: 0.5rem; background-color: #000000; color: white;">Argument name</th>
                            <th style="border: 1px solid #999; padding: 0.5rem; background-color: #000000; color: white;">Argument value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for arg in args %}
                            <tr>
                                <td style="border: 1px solid #999; padding: 0.5rem;">{{arg.0}}</td>
                                <td style="border: 1px solid #999; padding: 0.5rem;">{{arg.1}}</td>
                            </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
        </body>
    </html>
    """).render(started_at=started_at, host=HOSTNAME, args=[])

    msg = MIMEMultipart('related')

    msg['Subject'] = 'Restarting script pre-information - Daemon: {daemon} - {message}'.format(
        daemon='DEMON ARGS',
        message='ARGS MESSAGE'
    )
    msg['From'] = EMAIL_SETTINGS[stage]['sender_email']
    msg['To'] = ', '.join(EMAIL_SETTINGS[stage]['recipients'])
    msg['Date'] = formatdate(localtime=True)

    msg_content = MIMEText(content, 'html')
    msg.attach(msg_content)

    return msg



def synchronous_send_email(message, _logger, phase):
    sender = message['From']
    recipients = message['To'].split(',')
    try:
        s = smtplib.SMTP(SMTP_SERVER_HOST)
        s.sendmail(sender, recipients, message.as_string())
        s.quit()
        _logger.info(
            '{0} email from {1} to {2} sent successfully.'.format(
                phase, sender, recipients)
        )
    except Exception:
        _logger.error(
            '{0} email from {1} to {2} could not be sent.'.format(
            phase, sender, recipients)
        )



def send_email(message, _logger, phase):
    sender = message['From']
    recipients = message['To'].split(',')

    dfr = sendmail(SMTP_SERVER_HOST, sender, recipients, message.as_string())
    def success(r):
        _logger.info(
            '{0} email from {1} to {2} sent successfully.'.format(
                phase, sender, recipients)
        )
    def error(e):
        _logger.error(
            '{0} email from {1} to {2} could not be sent.'.format(
            phase, sender, recipients)
        )
    dfr.addCallback(success)
    dfr.addErrback(error)
    return dfr

logger = logging.getLogger(__file__)

msg = gen_pre_information([], 'testing')
synchronous_send_email(msg, logger, 'xxx')

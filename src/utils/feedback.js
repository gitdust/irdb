import { Message } from 'iview';

const messageOptions = content => ({
  content,
  duration: 2,
});

export const info = message => Message.info(messageOptions(message));
export const success = message => Message.success(messageOptions(message));
export const warning = message => Message.warning(messageOptions(message));
export const error = message => Message.error(messageOptions(message));

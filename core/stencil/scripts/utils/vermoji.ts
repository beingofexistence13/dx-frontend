import fs from 'fs-extra';

const UNKNOWN_VERMOJI = '❓';

let vermojis = [
  '💯',
  '☀️',
  '☕️',
  '♨️',
  '✈️',
  '✨',
  '❄️',
  '❤️',
  '☎️',
  '⚡️',
  '⚽️',
  '⚾️',
  '⛄️',
  '⛑',
  '⛰',
  '⛱',
  '⛲️',
  '⛳️',
  '⛴',
  '⛵️',
  '⛷',
  '⛸',
  '⛹',
  '⛺️',
  '⭐️',
  '🌀',
  '🌁',
  '🌃',
  '🌄',
  '🌅',
  '🌇',
  '🌈',
  '🌍',
  '🌎',
  '🌏',
  '🌐',
  '🌙',
  '🌜',
  '🌝',
  '🌞',
  '🌟',
  '🌪',
  '🌭',
  '🌮',
  '🌯',
  '🌱',
  '🌲',
  '🌳',
  '🌴',
  '🌵',
  '🌶',
  '🌷',
  '🌸',
  '🌹',
  '🌺',
  '🌻',
  '🌼',
  '🍀',
  '🍁',
  '🍅',
  '🍇',
  '🍈',
  '🍉',
  '🍊',
  '🍋',
  '🍌',
  '🍍',
  '🍎',
  '🍏',
  '🍐',
  '🍒',
  '🍓',
  '🍔',
  '🍕',
  '🍖',
  '🍗',
  '🍜',
  '🍝',
  '🍞',
  '🍟',
  '🍡',
  '🍣',
  '🍤',
  '🍦',
  '🍧',
  '🍨',
  '🍩',
  '🍪',
  '🍫',
  '🍬',
  '🍭',
  '🍮',
  '🍯',
  '🍰',
  '🍲',
  '🍵',
  '🍷',
  '🍸',
  '🍹',
  '🍺',
  '🍻',
  '🥃',
  '🍾',
  '🍿',
  '🎀',
  '🎁',
  '🎂',
  '🎆',
  '🎇',
  '🎈',
  '🎉',
  '🎊',
  '🎖',
  '🎙',
  '🎠',
  '🎡',
  '🎢',
  '🎤',
  '🎨',
  '🎩',
  '🎪',
  '🎬',
  '🎭',
  '🎯',
  '🎰',
  '🎱',
  '🎲',
  '🎳',
  '🎷',
  '🎸',
  '🎹',
  '🎺',
  '🎻',
  '🎾',
  '🎿',
  '🏀',
  '🏁',
  '🏂',
  '🏃',
  '🏄',
  '🏅',
  '🏆',
  '🏇',
  '🏈',
  '🏉',
  '🏊',
  '🏋',
  '🏌',
  '🏍',
  '🏎',
  '🏏',
  '🏐',
  '🏑',
  '🏒',
  '🏓',
  '🏔',
  '🏕',
  '🏖',
  '🏙',
  '🏜',
  '🏝',
  '🏰',
  '🏵',
  '🏸',
  '🏹',
  '🐁',
  '🐂',
  '🐄',
  '🐅',
  '🐆',
  '🐇',
  '🐈',
  '🐉',
  '🐊',
  '🐋',
  '🐌',
  '🐍',
  '🐎',
  '🐏',
  '🐐',
  '🐒',
  '🐓',
  '🐔',
  '🐕',
  '🐖',
  '🐗',
  '🐘',
  '🐙',
  '🐚',
  '🐛',
  '🐝',
  '🐞',
  '🐟',
  '🐠',
  '🐡',
  '🐣',
  '🐤',
  '🐥',
  '🐦',
  '🐧',
  '🐨',
  '🐩',
  '🐫',
  '🐬',
  '🐭',
  '🐮',
  '🐯',
  '🐰',
  '🐱',
  '🐳',
  '🐴',
  '🐵',
  '🐶',
  '🐷',
  '🐸',
  '🐹',
  '🐺',
  '🐻',
  '🐼',
  '🐽',
  '🐿',
  '👑',
  '👒',
  '👻',
  '👽',
  '👾',
  '💍',
  '💙',
  '💚',
  '💛',
  '💡',
  '💥',
  '💪',
  '💫',
  '💾',
  '💿',
  '📌',
  '📍',
  '📟',
  '🛰',
  '📢',
  '📣',
  '📬',
  '📷',
  '📺',
  '📻',
  '🔈',
  '🔋',
  '🔔',
  '🔥',
  '🔬',
  '🔭',
  '🔮',
  '🕊',
  '🕹',
  '🖍',
  '🗻',
  '😀',
  '😃',
  '😄',
  '😈',
  '😊',
  '😋',
  '😎',
  '😛',
  '😜',
  '😸',
  '🤓',
  '🤖',
  '🚀',
  '🚁',
  '🚂',
  '🚃',
  '🚅',
  '🚋',
  '🚌',
  '🚍',
  '🚎',
  '🚐',
  '🚑',
  '🚒',
  '🚓',
  '🚔',
  '🚕',
  '🚖',
  '🚗',
  '🚘',
  '🚙',
  '🚚',
  '🚛',
  '🚜',
  '🚞',
  '🚟',
  '🚠',
  '🚡',
  '🚢',
  '🚣',
  '🚤',
  '🚦',
  '🚨',
  '🚩',
  '🛠',
  '🛥',
  '🛩',
  '🛳',
  '🤘',
  '🦀',
  '🦁',
  '🦂',
  '🦃',
  '🦄',
  '🧀',
];

// filter out the 'unknown version vermoji'
vermojis = vermojis.filter((vermoji) => vermoji !== UNKNOWN_VERMOJI);

export function getVermoji(changelogPath: string) {
  const changelog = fs.readFileSync(changelogPath, 'utf8');

  while (true) {
    const randomIndex = Math.floor(Math.random() * vermojis.length);
    const vermoji = vermojis[randomIndex];
    if (changelog.includes(vermoji)) {
      vermojis.splice(randomIndex, 1);

      if (vermojis.length === 0) {
        console.warn(`We're out of Vermoji! Create a task to add some more!`);
        return UNKNOWN_VERMOJI;
      }
    } else {
      return vermoji;
    }
  }
}

/**
 * Pull the most recently used vermoji for the provided changelog path
 * @param changelogPath the path to the changelog to parse
 * @returns the vermoji found in the changelog, otherwise use a default value.
 */
export function getLatestVermoji(changelogPath: string) {
  let changelogContents = null;
  try {
    changelogContents = fs.readFileSync(changelogPath, 'utf8');
  } catch (err: unknown) {
    console.error(`Unable to read the changelog at path '${changelogPath}' - ${err}.`);
    console.error(`Defaulting to ${UNKNOWN_VERMOJI}`);
    return UNKNOWN_VERMOJI;
  }

  if (!changelogContents) {
    console.error(`The changelog at '${changelogPath}' was empty!`);
    console.error(`Defaulting to ${UNKNOWN_VERMOJI}`);
    return UNKNOWN_VERMOJI;
  }

  // grab the first line of the changelog
  const firstLine = changelogContents.trimStart().split('\n')[0];
  // match the first line of the changelog with a string that has:
  // - one or more pound signs (#), followed by a space
  // - capture the first non-space character(s)
  const match = firstLine.match(/^#+\s(\S+)/);
  // if a match was found, return the value in the first capture group. otherwise, use the default vermoji
  return match ? match[1] : UNKNOWN_VERMOJI;
}

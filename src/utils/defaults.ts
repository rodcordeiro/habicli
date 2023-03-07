enum PRIORITIES {
  Trivial = 0.1,
  Easy = 1,
  Medium = 1.5,
  Hard = 2,
}
enum ATTRIBUTE {
  Strength = 'str',
  Intelligence = 'int',
  Perception = 'per',
  Constitution = 'con',
}

enum CLASS_ATTR {
  Warrior = 'str',
  Mage = 'int',
  Wizard = 'int',
  Rogue = 'per',
  Healer = 'con',
}

function getClassAttr(str: string): string {
  switch (str) {
    case 'Warrior':
      return CLASS_ATTR.Warrior;
    case 'Mage':
    case 'Wizard':
      return CLASS_ATTR.Wizard;
    case 'Rogue':
      return CLASS_ATTR.Rogue;
    case 'Healer':
      return CLASS_ATTR.Healer;
    default:
      return CLASS_ATTR.Warrior;
  }
}

export { PRIORITIES, ATTRIBUTE, CLASS_ATTR, getClassAttr };

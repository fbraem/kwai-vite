import { Ability, detectSubjectType } from '@casl/ability';
import { unref } from 'vue';

const ability = new Ability([], {
  detectSubjectType: (subject) => {
    const realSubject = unref(subject);
    if (realSubject.type) return realSubject.type;
    return detectSubjectType(subject);
  }
});

export const useAbility = () => ability;

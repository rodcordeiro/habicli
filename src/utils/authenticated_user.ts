export interface iAuthenticatedUser {
  success: boolean;
  data: {
    auth: {
      local: {
        username: string;
        lowerCaseUsername: string;
        email: string;
        has_password: boolean;
      };
      timestamps: {
        created: string;
        loggedin: string;
        updated: string;
      };
      facebook: {
        id: string;
        emails: {
          value: string;
        }[];
      };
      google: {
        id: string;
        emails: {
          value: string;
          type: string;
        }[];
      };
      apple: {
        id: string;
        emails: {
          value: string;
        }[];
      };
    };
    achievements: {
      ultimateGearSets: {
        healer: boolean;
        wizard: boolean;
        rogue: boolean;
        warrior: boolean;
      };
      streak: number;
      challenges: [];
      perfect: number;
      quests: {
        dustbunnies: number;
        moon1: number;
        moon2: number;
      };
      createdTask: boolean;
      joinedGuild: boolean;
      joinedChallenge: boolean;
      completedTask: boolean;
      purchasedEquipment: boolean;
      hatchedPet: boolean;
      fedPet: boolean;
      partyUp: boolean;
      habiticaDays: number;
      habitBirthdays: number;
      goodluck: number;
      primedForPainting: boolean;
    };
    backer: {};
    contributor: {};
    permissions: {};
    purchased: {
      ads: boolean;
      txnCount: number;
      skin: {};
      hair: {};
      shirt: {};
      background: {
        violet: boolean;
        blue: boolean;
        green: boolean;
        purple: boolean;
        red: boolean;
        yellow: boolean;
      };
      plan: {
        consecutive: {
          count: number;
          offset: number;
          gemCapExtra: number;
          trinkets: number;
        };
        quantity: number;
        extraMonths: number;
        gemsBought: number;
        mysteryItems: [];
        dateUpdated: string;
      };
    };
    flags: {
      tour: {
        intro: number;
        classes: number;
        stats: number;
        tavern: number;
        party: number;
        guilds: number;
        challenges: number;
        market: number;
        pets: number;
        mounts: number;
        hall: number;
        equipment: number;
        groupPlans: number;
      };
      tutorial: {
        common: {
          habits: boolean;
          dailies: boolean;
          todos: boolean;
          rewards: boolean;
          party: boolean;
          pets: boolean;
          gems: boolean;
          skills: boolean;
          classes: boolean;
          tavern: boolean;
          equipment: boolean;
          items: boolean;
          mounts: boolean;
          inbox: boolean;
          stats: boolean;
        };
        ios: {
          addTask: boolean;
          editTask: boolean;
          deleteTask: boolean;
          filterTask: boolean;
          groupPets: boolean;
          inviteParty: boolean;
          reorderTask: boolean;
        };
      };
      customizationsNotification: boolean;
      showTour: boolean;
      dropsEnabled: boolean;
      itemsEnabled: boolean;
      lastNewStuffRead: string;
      rewrite: boolean;
      classSelected: boolean;
      rebirthEnabled: boolean;
      recaptureEmailsPhase: number;
      weeklyRecapEmailsPhase: number;
      communityGuidelinesAccepted: boolean;
      cronCount: 156;
      welcomed: boolean;
      armoireEnabled: boolean;
      armoireOpened: boolean;
      armoireEmpty: boolean;
      cardReceived: boolean;
      warnedLowHealth: boolean;
      verifiedUsername: boolean;
      levelDrops: {
        atom1: boolean;
      };
      lastWeeklyRecap: string;
      onboardingEmailsPhase: string;
      newStuff: boolean;
    };
    history: {
      exp: {
        date: number;
        value: number;
      }[];
      todos: {
        date: number | string;
        value: number;
      }[];
    };
    items: {
      gear: {
        equipped: {
          armor: string;
          head: string;
          shield: string;
          weapon: string;
          eyewear: string;
        };
        costume: {
          armor: string;
          head: string;
          shield: string;
          weapon: string;
          eyewear: string;
        };
        owned: {
          headAccessory_special_blackHeadband: boolean;
          headAccessory_special_blueHeadband: boolean;
          headAccessory_special_greenHeadband: boolean;
          headAccessory_special_pinkHeadband: boolean;
          headAccessory_special_redHeadband: boolean;
          headAccessory_special_whiteHeadband: boolean;
          headAccessory_special_yellowHeadband: boolean;
          eyewear_special_blackTopFrame: boolean;
          eyewear_special_blueTopFrame: boolean;
          eyewear_special_greenTopFrame: boolean;
          eyewear_special_pinkTopFrame: boolean;
          eyewear_special_redTopFrame: boolean;
          eyewear_special_whiteTopFrame: boolean;
          eyewear_special_yellowTopFrame: boolean;
          eyewear_special_blackHalfMoon: boolean;
          eyewear_special_blueHalfMoon: boolean;
          eyewear_special_greenHalfMoon: boolean;
          eyewear_special_pinkHalfMoon: boolean;
          eyewear_special_redHalfMoon: boolean;
          eyewear_special_whiteHalfMoon: boolean;
          eyewear_special_yellowHalfMoon: boolean;
          armor_special_bardRobes: boolean;
          weapon_warrior_0: boolean;
          armor_special_spring2020Warrior: boolean;
          head_special_bardHat: boolean;
          weapon_warrior_1: boolean;
          head_warrior_1: boolean;
          shield_warrior_1: boolean;
          weapon_special_bardInstrument: boolean;
          armor_armoire_wovenRobes: boolean;
          armor_special_pageArmor: boolean;
          head_special_pageHelm: boolean;
          head_special_lunarWarriorHelm: boolean;
          weapon_wizard_0: boolean;
          head_special_nye: boolean;
          weapon_special_pageBanner: boolean;
          armor_special_birthday: boolean;
          shield_special_diamondStave: boolean;
          weapon_wizard_1: boolean;
          weapon_wizard_2: boolean;
          armor_special_lunarWarriorArmor: boolean;
          head_special_piDay: boolean;
          shield_special_piDay: boolean;
          shield_armoire_flutteryFan: boolean;
          weapon_wizard_3: boolean;
          head_special_nye2014: boolean;
          armor_special_birthday2015: boolean;
          head_special_namingDay2017: boolean;
          weapon_special_skeletonKey: boolean;
          shield_special_lootBag: boolean;
          head_special_nye2015: boolean;
          head_special_clandestineCowl: boolean;
          armor_special_sneakthiefRobes: boolean;
          armor_special_birthday2016: boolean;
        };
      };
      special: {
        snowball: number;
        spookySparkles: number;
        shinySeed: number;
        seafoam: number;
        valentine: number;
        valentineReceived: [];
        nye: number;
        nyeReceived: [];
        greeting: number;
        greetingReceived: [];
        thankyou: number;
        thankyouReceived: [];
        birthday: number;
        birthdayReceived: [];
        congrats: number;
        congratsReceived: [];
        getwell: number;
        getwellReceived: [];
        goodluck: number;
        goodluckReceived: [];
      };
      lastDrop: {
        count: number;
        date: string;
      };
      pets: {
        'BearCub-Golden': number;
        'Fox-CottonCandyPink': number;
        'Dragon-RoyalPurple': number;
        'Dragon-CottonCandyPink': number;
        'Wolf-RoyalPurple': number;
        'TigerCub-Red': number;
        'PandaCub-CottonCandyBlue': number;
        'Cactus-Base': number;
        'TigerCub-White': number;
        'BearCub-CottonCandyBlue': number;
        'Fox-Skeleton': number;
        'PandaCub-RoyalPurple': number;
        'Wolf-CottonCandyBlue': number;
        'FlyingPig-RoyalPurple': number;
        'Cactus-CottonCandyBlue': number;
        'BearCub-Skeleton': number;
        'JackOLantern-Base': number;
        'Turkey-Base': number;
        'FlyingPig-White': number;
        'Dragon-Shade': number;
        'LionCub-RoyalPurple': number;
        'BearCub-Desert': number;
        'Wolf-Desert': number;
        'Cactus-White': number;
        'Fox-RoyalPurple': number;
        'Orca-Base': number;
        'Gryphon-RoyalPurple': number;
        'Cactus-Shade': number;
        'FlyingPig-Golden': number;
        'Fox-White': number;
        'Fox-Golden': number;
        'TigerCub-RoyalPurple': number;
        'BearCub-Red': number;
        'BearCub-CottonCandyPink': number;
        'LionCub-Golden': number;
        'LionCub-Skeleton': number;
        'BearCub-White': number;
        'LionCub-White': number;
        'Dragon-White': number;
        'PandaCub-White': number;
        'Wolf-White': number;
        'TigerCub-Skeleton': number;
        'PandaCub-Skeleton': number;
        'JackOLantern-Ghost': number;
        'Turkey-Gilded': number;
        'Fox-Zombie': number;
        'Fox-Shade': number;
        'Dragon-Base': number;
        'Dragon-Red': number;
        'Dragon-Skeleton': number;
      };
      eggs: {
        BearCub: number;
        Fox: number;
        Dragon: number;
        PandaCub: number;
        TigerCub: number;
        Cactus: number;
        Wolf: number;
        FlyingPig: number;
        LionCub: number;
      };
      hatchingPotions: {
        Golden: number;
        CottonCandyPink: number;
        RoyalPurple: number;
        Red: number;
        CottonCandyBlue: number;
        Base: number;
        White: number;
        Skeleton: number;
        Shade: number;
        Desert: number;
        Zombie: number;
      };
      food: {
        Meat: number;
        Honey: number;
        CottonCandyPink: number;
        Strawberry: number;
        Chocolate: number;
        Fish: number;
        Potatoe: number;
        RottenMeat: number;
        CottonCandyBlue: number;
        Milk: number;
        Cake_Base: number;
        Cake_CottonCandyBlue: number;
        Cake_CottonCandyPink: number;
        Cake_Desert: number;
        Cake_Golden: number;
        Cake_Red: number;
        Cake_Shade: number;
        Cake_Skeleton: number;
        Cake_White: number;
        Cake_Zombie: number;
        Saddle: number;
        Candy_Base: number;
        Candy_CottonCandyBlue: number;
        Candy_CottonCandyPink: number;
        Candy_Desert: number;
        Candy_Golden: number;
        Candy_Red: number;
        Candy_Shade: number;
        Candy_Skeleton: number;
        Candy_White: number;
        Candy_Zombie: number;
        Pie_Base: number;
        Pie_CottonCandyBlue: number;
        Pie_CottonCandyPink: number;
        Pie_Desert: number;
        Pie_Golden: number;
        Pie_Red: number;
        Pie_Shade: number;
        Pie_Skeleton: number;
        Pie_White: number;
        Pie_Zombie: number;
      };
      mounts: {
        'Orca-Base': boolean;
        'Gryphon-RoyalPurple': boolean;
        'Dragon-RoyalPurple': boolean;
        'Wolf-RoyalPurple': boolean;
        'Wolf-CottonCandyBlue': boolean;
        'Fox-Skeleton': boolean;
        'Dragon-Shade': boolean;
        'Wolf-Desert': boolean;
        'Dragon-CottonCandyPink': boolean;
        'JackOLantern-Base': boolean;
        'Turkey-Base': boolean;
        'Dragon-Base': boolean;
        'BearCub-CottonCandyPink': boolean;
      };
      quests: {
        dustbunnies: number;
        moon1: number;
        moon2: number;
        moon3: number;
        atom1: number;
        basilist: number;
      };
      currentPet: string;
      currentMount: string;
    };
    invitations: {
      guilds: [];
      party: {};
      parties: [];
    };
    party: {
      quest: {
        progress: {
          up: number;
          down: number;
          collectedItems: number;
          collect: {};
        };
        RSVPNeeded: boolean;
        key: string;
        completed: null;
      };
      order: string;
      orderAscending: string;
      _id: string;
    };
    preferences: {
      hair: {
        color: string;
        base: number;
        bangs: number;
        beard: number;
        mustache: number;
        flower: number;
      };
      emailNotifications: {
        unsubscribeFromAll: boolean;
        newPM: boolean;
        kickedGroup: boolean;
        wonChallenge: boolean;
        giftedGems: boolean;
        giftedSubscription: boolean;
        invitedParty: boolean;
        invitedGuild: boolean;
        questStarted: boolean;
        invitedQuest: boolean;
        importantAnnouncements: boolean;
        weeklyRecaps: boolean;
        onboarding: boolean;
        majorUpdates: boolean;
        subscriptionReminders: boolean;
      };
      pushNotifications: {
        unsubscribeFromAll: boolean;
        newPM: boolean;
        wonChallenge: boolean;
        giftedGems: boolean;
        giftedSubscription: boolean;
        invitedParty: boolean;
        invitedGuild: boolean;
        questStarted: boolean;
        invitedQuest: boolean;
        majorUpdates: boolean;
        mentionParty: boolean;
        mentionJoinedGuild: boolean;
        mentionUnjoinedGuild: boolean;
        partyActivity: boolean;
      };
      suppressModals: {
        levelUp: boolean;
        hatchPet: boolean;
        raisePet: boolean;
        streak: boolean;
      };
      tasks: {
        groupByChallenge: boolean;
        confirmScoreNotes: boolean;
        mirrorGroupTasks: [];
      };
      dayStart: number;
      size: string;
      hideHeader: boolean;
      skin: string;
      shirt: string;
      timezoneOffset: number;
      sound: string;
      chair: string;
      allocationMode: string;
      autoEquip: boolean;
      dateFormat: string;
      sleep: boolean;
      stickyHeader: boolean;
      disableClasses: boolean;
      newTaskEdit: boolean;
      dailyDueDefaultView: boolean;
      advancedCollapsed: boolean;
      toolbarCollapsed: boolean;
      reverseChatOrder: boolean;
      displayInviteToPartyWhenPartyIs1: boolean;
      improvementCategories: [];
      language: string;
      webhooks: {};
      background: string;
      timezoneOffsetAtLastCron: number;
      costume: boolean;
    };
    profile: {
      name: string;
      imageUrl: string;
      blurb: string;
    };
    stats: {
      buffs: {
        str: number;
        int: number;
        per: number;
        con: number;
        stealth: number;
        streaks: boolean;
        snowball: boolean;
        spookySparkles: boolean;
        shinySeed: boolean;
        seafoam: boolean;
      };
      training: {
        int: number;
        per: number;
        str: number;
        con: number;
      };
      hp: number;
      mp: number;
      exp: number;
      gp: number;
      lvl: number;
      class: string;
      points: number;
      str: number;
      con: number;
      int: number;
      per: number;
      toNextLevel: number;
      maxHealth: number;
      maxMP: number;
    };
    inbox: {
      newMessages: number;
      optOut: boolean;
      blocks: [];
      messages: {
        [k: string]: {
          sent: boolean;
          flagCount: number;
          _id: string;
          ownerId: string;
          flags: {};
          id: string;
          text: string;
          unformattedText: string;
          info: {};
          timestamp: string;
          likes: {};
          uuid: string;
          contributor: {};
          backer: {};
          user: string;
          username: string;
          userStyles: {
            items: {
              gear: {
                costume: {
                  armor: string;
                  head: string;
                  shield: string;
                  weapon: string;
                  eyewear: string;
                };
                equipped: {
                  armor: string;
                  head: string;
                  shield: string;
                  weapon: string;
                  eyewear: string;
                };
              };
              currentMount: string;
              currentPet: string;
            };
            preferences: {
              hair: {
                color: string;
                base: number;
                bangs: number;
                beard: number;
                mustache: number;
                flower: number;
              };
              skin: string;
              shirt: string;
              chair: string;
              size: string;
              background: string;
              costume: boolean;
            };
            stats: {
              class: string;
              buffs: {
                seafoam: boolean;
                shinySeed: boolean;
                spookySparkles: boolean;
                snowball: boolean;
              };
            };
          };
        };
      };
    };
    tasksOrder: {
      habits: string[];
      dailys: string[];
      todos: string[];
      rewards: string[];
    };
    _v: number;
    balance: number;
    _subSignature: string;
    challenges: string[];
    guilds: string[];
    loginIncentives: number;
    invitesSent: number;
    pinnedItemsOrder: [];
    _id: string;
    lastCron: string;
    newMessages: {
      [k: string]: {
        name: string;
        value: boolean;
      };
    };
    notifications: {
      type: string;
      data: {
        headerText: string;
        bodyText: string;
      };
      seen: boolean;
      id: string;
    }[];
    tags: {
      id: string;
      name: string;
      challenge?: boolean;
    }[];
    extra: {};
    pushDevices: {
      regId: string;
      type: string;
      createdAt: string;
      updatedAt: string;
    }[];
    webhooks: {
      type: string;
      label: string;
      enabled: boolean;
      failures: number;
      url: string;
      options: {
        created: boolean;
        updated: boolean;
        deleted: boolean;
        checklistScored: boolean;
        scored: boolean;
      };
      id: string;
      createdAt: string;
      updatedAt: string;
      lastFailureAt: null;
    }[];
    pinnedItems: {
      type: string;
      path: string;
    }[];
    unpinnedItems: {
      path: string;
      type: string;
    }[];
    migration: string;
    id: string;
    needsCron: boolean;
  };
  notifications: {
    type: string;
    data: {
      headerText: string;
      bodyText: string;
    };
    seen: boolean;
    id: string;
  }[];
  userV: number;
  appVersion: string;
}

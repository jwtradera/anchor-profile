export type AnchorProfile = {
  "version": "0.1.0",
  "name": "anchor_profile",
  "constants": [
    {
      "name": "PROFILE_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"PROFILE_STATE\""
    },
    {
      "name": "LIKE_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"LIKE_STATE\""
    }
  ],
  "instructions": [
    {
      "name": "createProfile",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        }
      ]
    },
    {
      "name": "likeProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLike",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "follower",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "unlikeProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLike",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "user",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "likes",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "userLike",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "follower",
            "type": "publicKey"
          },
          {
            "name": "liked",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "NotAllowed"
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    }
  ]
};

export const IDL: AnchorProfile = {
  "version": "0.1.0",
  "name": "anchor_profile",
  "constants": [
    {
      "name": "PROFILE_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"PROFILE_STATE\""
    },
    {
      "name": "LIKE_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"LIKE_STATE\""
    }
  ],
  "instructions": [
    {
      "name": "createProfile",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        }
      ]
    },
    {
      "name": "likeProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLike",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "follower",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "unlikeProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLike",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "user",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "likes",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "userLike",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "follower",
            "type": "publicKey"
          },
          {
            "name": "liked",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "NotAllowed"
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    }
  ]
};

<?php
return [
  'databases' => [
    'test' => [
      'a_table_with_a_really_long_name' => [
        'id' => 'id',
        'fields' => [
          'id' => [
            'type' => 'int'
          ]
        ]
      ],
      'wp_many_columns' => [
        'id' => 'post_id',
        'fields' => [
          'post_id' => [
            'type' => 'int'
          ]
        ]
      ]
    ],
    'jiddra' => [
      'wp_posts' => [
        'id' => 'ID',
        'fields' => [
          'id' => [
            'type' => 'none',
          ],
          'post_title' => [
            'type' => 'text'
          ],
          'post_content' => [
            'type' => 'select',
            'options' => [
              'sweden' => 'Sweden',
              'norway' => 'Norway'
            ]
          ]
        ],
      ],
      'wp_options' => [
        'option_name' => [
          'type' => 'text'
        ],
        'option_value' => [
          'type' => 'textarea'
        ]
      ]
    ]
  ]
];
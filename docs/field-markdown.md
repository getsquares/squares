# Markdown

## Features

### Tree

- Folders and image files browser
- Image tag editor
- Image tag drag and drop to textarea
- Image preview

### Editor

- Textarea to write markdown
- Toggle image file browser

### Preview

- Live preview
- Markdown support by Marked
- Image support
- Close button to go back to the sheet
- Status indicator

### Footer

- File breadcrumbs
- Row and column location
- Time since last successful save
- Word count
- Database fild limit (bytes)

### Hidden stuff

- Autosave every x seconds
- CTRL + S to force a save
- Plenty of options

## Options

The options is placed under fields/markdown like below.

```json
{
  "fields": {
		"markdown": {
      preview: {
        delay: 300,
        css: null
      },
      editor: {
        spellcheck: false,
        width: "900px"
      },
      revisions: {
        path: "revisions/markdown",
        limit: 5
      },
      media: {
        path: "server-media",
        folder: null
      },
      autosave: {
        save: 15,
        retry: 45,
        warning: 300,
        danger: 900
      },
      words: {
        danger: {
          min: 0,
          max: 799
        },
        warning: {
          min: 800,
          max: 1999
        },
        success: {
          min: 2000
        }
      }
    }
  }
}
```

## Markdown docs

I throw in some guides on how to write markdown.

- https://www.markdownguide.org/basic-syntax/
- https://guides.github.com/features/mastering-markdown/
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
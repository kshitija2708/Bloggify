import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Box, Button, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import Underline from "@tiptap/extension-underline"
interface ContentBoxProps {
  setContent: (content: string) => void
}

export default function ContentBox({ setContent }: ContentBoxProps) {
  const editor = useEditor({
    extensions: [StarterKit,Underline],
    content: "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      const htmlContent=editor.getHTML();
      setContent(htmlContent)
    },
  })

  if (!editor) {
    return <div>Loading editor...</div>
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "700px",
        margin: "auto",
        mt: 4,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Paper sx={{ display: "flex", gap: 1, p: 1, mb: 2 }}>
        <ToggleButtonGroup  size="small" exclusive>
          <ToggleButton  value="bold" component="button" onClick={() => editor.chain().focus().toggleBold().run()} selected={editor.isActive("bold")}>
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton  value="bold" component="button" onClick={() => editor.chain().focus().toggleItalic().run()} selected={editor.isActive("italic")}>
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton  value="bold" component="button" onClick={() => editor.chain().focus().toggleUnderline().run()} selected={editor.isActive("underline")}>
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton  value="bold" component="button" onClick={() => editor.chain().focus().toggleBulletList().run()} selected={editor.isActive("bulletList")}>
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton  value="bold" component="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} selected={editor.isActive("orderedList")}>
            <FormatListNumberedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Button size="small" onClick={() => editor.chain().focus().undo().run()}><UndoIcon /></Button>
        <Button size="small" onClick={() => editor.chain().focus().redo().run()}><RedoIcon /></Button>
      </Paper>

      <Paper sx={{ p: 2, minHeight: "200px", border: "1px solid #ccc", borderRadius: 2 }}>
        <EditorContent editor={editor} />
      </Paper>
    </Box>
  )
}

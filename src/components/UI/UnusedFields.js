<div>
          <TextField
            onWheel={() => document.activeElement.blur()}
            onChange={(event) => {
              inputHandler("adjustment", event);
            }}
            inputProps={{
              step: 0.01,
            }}
            type="number"
            id="adjustment"
            value={enteredAdj}
            variant="outlined"
            label="Adjustment € - / + "
            hidden
          />

<div>
<TextField
  onChange={(event) => {
    inputHandler("adjNote", event);
  }}
  type="text"
  id="adjNote"
  value={adjNote}
  variant="outlined"
  label="Adj Note"
  multiline
  hidden
/>
</div>
</div>


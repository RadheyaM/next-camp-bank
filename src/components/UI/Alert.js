{alert && (
    <Stack sx={{ width: "60%" }} spacing={5}>
      <Alert
        severity="info"
        onClose={() => {
          setAlert(false);
        }}
      >
        <AlertTitle>
          Last Transaction:<strong>&nbsp;{name}&nbsp;|&nbsp;Current Balance:&nbsp;{euro.format(balance)}</strong>
        </AlertTitle>
        Dep:&nbsp;€{dep}&nbsp;|&nbsp;Book:&nbsp;€{book}&nbsp;|&nbsp;Tuck:&nbsp;€{tuck}&nbsp;
        |&nbsp;Withdrawal&nbsp;€{withdrawn}
      </Alert>
    </Stack>
  )}
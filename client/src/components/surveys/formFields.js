const formFields= [
  { label: 'Campaign Title', name: 'title' }, // each inputs has its own name and label 
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' } // property name recipients
];
export default formFields;


     //  it's going to automatically store it inside of our redux store under a key of name
     // so field have everything identical except label and a name
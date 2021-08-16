ansible-playbook -i env/dev/hosts build.yml --vault-password-file ./.vault_pass_dev
ansible-playbook -i env/dev/hosts release.yml

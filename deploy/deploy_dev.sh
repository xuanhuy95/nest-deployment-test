ansible-playbook -i env/dev/hosts build.yml
ansible-playbook -i env/dev/hosts release.yml --vault-password-file ./.vault_pass_dev

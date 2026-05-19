package com.cognizant.insurance.service;

import com.cognizant.insurance.entity.PolicyCategory;
import com.cognizant.insurance.repository.PolicyCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class PolicyCategoryService {

    private final PolicyCategoryRepository policyCategoryRepository;

    public PolicyCategoryService(PolicyCategoryRepository policyCategoryRepository) {
        this.policyCategoryRepository = policyCategoryRepository;
    }

    @Transactional
    public PolicyCategory createPolicyCategory(String name, String description) {
        PolicyCategory category = new PolicyCategory();
        if(policyCategoryRepository.existsByName(name)){
            throw new IllegalArgumentException("Policy category with this name already exists");
        }

        category.setName(name);
        category.setDescription(description);
        return policyCategoryRepository.save(category);

    }

    public PolicyCategory getPolicyCategoryById(Long id) {
        return policyCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Policy category not found with id: " + id));
    }

    @Transactional
    public PolicyCategory updatePolicyCategory(Long id, String name, String description) {
        PolicyCategory category = getPolicyCategoryById(id);
        if (name != null && !name.equals(category.getName())) {
            if (policyCategoryRepository.existsByName(name)) {
                throw new IllegalArgumentException("Policy category with this name already exists");
            }
            category.setName(name);
        }
        if (description != null) {
            category.setDescription(description);
        }
        return policyCategoryRepository.save(category);
    }

    @Transactional
    public PolicyCategory deletePolicyCategory(Long id) {
        PolicyCategory category = getPolicyCategoryById(id);
        category.setIsActive(false);
        return policyCategoryRepository.save(category);
    }

    @Transactional
    public PolicyCategory reactivatePolicyCategory(Long id) {
        PolicyCategory category = getPolicyCategoryById(id);
        category.setIsActive(true);
        return policyCategoryRepository.save(category);
    }

    public List<PolicyCategory> getActivePolicyCategories() {
        return policyCategoryRepository.findByIsActiveTrue();
    }

    public List<PolicyCategory> getAllCategories(){
        return policyCategoryRepository.findAll();
    }


}

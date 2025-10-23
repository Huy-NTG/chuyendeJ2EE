package com.example.backend.mapper;
import com.example.backend.dto.request.UserRequest;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
@Mapper(componentModel = "spring")
public interface UserMapper {
    // Convert Request → Entity
    User toEntity(UserRequest request);

    // Convert Entity → Response
    UserResponse toResponse(User user);

    // Update thông tin User từ request
    void updateEntity(@MappingTarget User user, UserRequest request);
}
